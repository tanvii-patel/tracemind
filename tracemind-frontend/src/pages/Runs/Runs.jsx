import RunTable from "../../components/RunTable/RunTable";
import "./Runs.css";

function Runs() {

    return (

        <div className="runs-page">

            <div className="page-header">

                <div>

                    <h1>Workflow Runs</h1>

                    <p>

                        Monitor every AI execution and inspect workflow history.

                    </p>

                </div>

            </div>

            <RunTable />

        </div>

    );

}

export default Runs;