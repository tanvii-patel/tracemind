import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { getHistory } from "../../services/historyService";

import "./HistoryTable.css";

function HistoryTable() {

    const [history,setHistory] = useState([]);

    const [search,setSearch] = useState("");

    useEffect(()=>{

        loadHistory();

    },[]);

    async function loadHistory(){

        try{

            const response = await getHistory();

            setHistory(response.data);

        }

        catch(err){

            console.log(err);

        }

    }

    const filtered = history.filter(item=>

        item.description
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return(

        <div className="history-card">

            <div className="history-toolbar">

                <div className="history-search">

                    <Search size={18}/>

                    <input

                        placeholder="Search History..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Action</th>

                        <th>Description</th>

                        <th>Time</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filtered.map(item=>(

                            <tr key={item.id}>

                                <td>

                                    {item.action}

                                </td>

                                <td>

                                    {item.description}

                                </td>

                                <td>

                                    {

                                        item.createdAt

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default HistoryTable;