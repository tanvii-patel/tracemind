import "./Stats.css";

function StatCard({

    title,
    value,
    change,
    color,
    icon

}) {

    return (

        <div className={`stat-card ${color}`}>

            <div className="stat-top">

                <div>

                    <span>{title}</span>

                    <h2>{value}</h2>

                </div>

                <div className="icon">

                    {icon}

                </div>

            </div>

            <p>

                {change}

            </p>

        </div>

    );

}

export default StatCard;