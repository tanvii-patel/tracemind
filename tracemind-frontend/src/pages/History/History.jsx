import HistoryTable from "../../components/HistoryTable/HistoryTable";
import "./History.css";

function History() {

    return (

        <div className="history-page">

            <h1>History</h1>

            <p>
                Timeline of every action performed in TraceMind.
            </p>

            <HistoryTable/>

        </div>

    );

}

export default History;