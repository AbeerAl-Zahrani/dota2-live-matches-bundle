
import React, { useEffect } from "react"
import NodeCG from "@nodecg/types"
import styles from './_Host.module.css'
import { useReplicantValue } from "../../common/hooks/useReplicant"
import { Match } from "../../@types/replicants";
import { LOWERTHIRDS_HOST } from "../../common/replicants"

function Host() {
    const [matches, setMatches] = useReplicantValue<Match[]>(LOWERTHIRDS_HOST.NAME, LOWERTHIRDS_HOST.NAME_SPACE);
    const handleAddMatch = () => {
        nodecg.sendMessage("fetchDota2Data")

    };


    return (
        <>
            <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Dota 2 Matches</h1>
                <button
                    onClick={() => handleAddMatch()}
                    className={styles.btn}

                >
                    Refresh Data
                </button>
                {matches?.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No upcoming matches found.</p>
                ) : (
                    <div

                        className={styles.dashboardParent}
                    >
                        {matches?.map((match) => (
                            <div
                                key={match.id}

                                className={styles.matchCard}
                            >
                                <h2 style={{ textAlign: "center" }}>{match?.league?.name}</h2>
                                <h4 style={{ textAlign: "center", margin: "0.5rem 0" }}>
                                    {match?.serie?.full_name}
                                </h4>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {match?.opponents?.map((opponent, id) => (
                                        <div
                                            key={id}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                width: "45%",
                                            }}
                                        >
                                            <img
                                                src={opponent.opponent.image_url || ""}
                                                alt=''
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "contain",
                                                    borderRadius: "50%",
                                                    marginBottom: "0.5rem",
                                                }}
                                            />
                                            <span style={{ textAlign: "center" }}>
                                                {opponent.opponent.name || "TBD"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ textAlign: "center", marginBottom: "0.5rem" }}>
                                    <strong>Starts:</strong>
                                    {new Date(match?.begin_at)?.toLocaleString()}
                                </p>
                                <p style={{ textAlign: "center" }}>
                                    <strong>Status:</strong> {match.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default Host
