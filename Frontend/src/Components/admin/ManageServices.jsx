import react, { useEffect, useState } from "react";

export default function ManageServices(){
    const [services,setservices]=useState([]);
    const [newnumber,setnumber]=useState([]);
    const [newtitle,settitle]=useState([]);

    useEffect(()=>{
        fetch()
        .then((response)=>response.json())
        .then((json)=>setservices(json))
    },[])

    function deleteservice(id){
        fetch(``,
          {
            method: "DELETE",
          }
        ).then(response=>response.json())
        .then(data=>{
          setservice((services)=>{
            return services.filter((service)=> service.id!==id)
          })
        })
    }

    return(
        <div className="flex flex-col justify-center items-center mt-[10vh]">
            <table>
                <thead >
                    <tr className="h-10">
                        <th className="font-bold text-xl w-17">Sr. No</th>
                        <th className="font-bold text-xl w-75">Title</th>
                        <th className="font-bold text-xl w-50">Actions</th>
                    </tr>
                </thead>
                <tbody className="border-2 border-gray-400">
                    {services.map(service=>
                        <tr key={service.id} className="h-15">
                            <td className="font-bold pl-3 border-r-2 border-r-gray-400">1</td>
                            <td className="font-medium pl-6 border-r-2 border-r-gray-400">{service.title}</td>
                            <td className="flex flex-row justify-center items-center h-15">
                                <button className="mx-4 bg-blue-500 text-white h-10 w-15 rounded-md font-medium hover:bg-blue-600 hover:font-bold cursor-pointer">Edit</button>
                                <button onClick={()=>deleteservice(service.id)} className="mx-4 bg-red-600 text-white h-10 w-15 rounded-md font-medium hover:bg-red-700 hover:font-bold cursor-pointer">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}