exports.checkAvailability = async (serviceId, date) => {
    const existingBookings = await Booking.find({
      service: serviceId,
      date: {
        $gte: new Date(date).setHours(0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59)
      },
      status: 'approved'
    });
    
    return existingBookings.length === 0;
  };
  
  // Use node-cron for reminders
  const cron = require('node-cron');
  const sendReminders = require('./emailService');
  
  // Run daily at 9 AM
  cron.schedule('0 9 * * *', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    Booking.find({ 
      date: { 
        $gte: tomorrow.setHours(0, 0, 0),
        $lt: tomorrow.setHours(23, 59, 59)
      }
    }).populate('user').then(bookings => {
      bookings.forEach(booking => {
        sendReminders(booking.user.email, booking);
      });
    });
  });