"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getScanHistory } from "@/services/api";


const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";


interface Scan {

  id:number;

  filename:string;

  status:string;

  risk_score:number;

  report_path?:string | null;

}



export default function HistoryPage(){


  const router = useRouter();


  const [history,setHistory] =
    useState<Scan[]>([]);


  const [loading,setLoading] =
    useState(true);


  const [search,setSearch] =
    useState("");


  const [error,setError] =
    useState("");



  useEffect(()=>{


    const token =
      localStorage.getItem("token");


    if(!token){

      router.replace("/login");

      return;

    }



    async function loadHistory(){

      try{

        const data =
          await getScanHistory();


        setHistory(data);


      }
      catch(err){


        console.error(
          "History Error:",
          err
        );


        setError(
          err instanceof Error
          ? err.message
          : "Failed to load history."
        );


      }
      finally{

        setLoading(false);

      }

    }



    loadHistory();


  },[router]);





  const filteredHistory =
    history.filter((scan)=>

      scan.filename
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );





  if(loading){

    return(

      <div
      className="
      flex
      min-h-screen
      items-center
      justify-center
      text-xl
      text-white
      "
      >

        Loading scan history...

      </div>

    );

  }





return(

<main
className="
min-h-screen
bg-black
p-4
text-white
md:p-8
"
>


<h1
className="
mb-8
text-4xl
font-bold
text-cyan-400
"
>
Scan History
</h1>



{
error &&

<div
className="
mb-6
rounded-lg
border
border-red-700
bg-red-950/30
p-4
text-red-400
"
>

{error}

</div>

}




<input

type="search"

placeholder="Search filename..."

value={search}

onChange={
(e)=>setSearch(e.target.value)
}


className="
mb-6
w-full
rounded-lg
border
border-slate-700
bg-slate-800
p-3
text-white
outline-none
focus:border-cyan-500
"

/>





{
filteredHistory.length===0 ?


(

<div
className="
rounded-xl
bg-slate-900
p-8
text-center
text-slate-400
"
>

No scan history found.

</div>

)


:

(

<div
className="
overflow-x-auto
rounded-xl
border
border-slate-800
"
>


<table
className="
w-full
text-left
"
>


<thead
className="
bg-slate-900
"
>

<tr>

<th className="p-4">
File
</th>

<th className="p-4">
Status
</th>

<th className="p-4">
Risk Score
</th>

<th className="p-4">
Report
</th>

</tr>

</thead>




<tbody>


{
filteredHistory.map((scan)=>(


<tr
key={scan.id}
className="
border-t
border-slate-800
"
>


<td className="p-4">

{scan.filename}

</td>



<td className="p-4">


<span
className={`
rounded-full
px-3
py-1
text-sm
font-semibold

${
scan.status.toLowerCase()==="safe"

?
"bg-green-600"

:

scan.status.toLowerCase()==="warning"

?
"bg-yellow-500"

:

"bg-red-600"

}

`}
>

{scan.status}

</span>


</td>




<td className="p-4">

{scan.risk_score}

</td>




<td className="p-4">


{
scan.report_path

?

<a

href={

`${BACKEND_URL}/reports/${
scan.report_path.split("/").pop()
}`

}

target="_blank"

rel="noopener noreferrer"

className="
text-cyan-400
hover:underline
"

>

Download PDF

</a>


:

<span className="text-slate-500">

Not Available

</span>

}


</td>



</tr>


))

}



</tbody>


</table>


</div>


)

}
</main>
);
}