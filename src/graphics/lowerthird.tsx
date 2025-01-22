import ReactDOM from "react-dom"
import React from "react"
import styles from "./style.module.css";
import { LOWERTHIRDS_HOST } from "../common/replicants"
import { Match } from "../@types/replicants"
import { useOnlyReplicantValue } from "../common/hooks/useReplicant"

function LowerThird() {
  // Use the replicant hook to fetch the data
  const matches = useOnlyReplicantValue<Match[]>(LOWERTHIRDS_HOST.NAME, LOWERTHIRDS_HOST.NAME_SPACE)

  return (
    <div className={styles.OverlayContainer}>
      <h1 className={styles.Header}>Dota 2 Live Matches</h1>
      {matches === undefined ? (
        <div className={styles.Loading}>Loading matches...</div>
      ) : matches.length == 0 ? (
        <div className={styles.NoMatches}>No matches found.</div>
      ) : (
        matches?.map((match) => (
          <div className={styles.MatchCard} key={match?.id}>
            <div className={styles.TeamInfo}>
              <img
                className={styles.TeamLogo}
                src={match.opponents[0].opponent.image_url || "/placeholder.png"}
                alt="Team Logo"
              />
              <div style={{ borderLeft: '2px solid grey', padding: '10px', fontSize: '20px' }}>{match.opponents[0].opponent.name || "TBD"}</div>
            </div>
            <div className={styles.MatchDetails}>
              <h2 className={styles.LeagueName}>{match.league.name}</h2>
              <div className={styles.Opponents}>
                {match.opponents[0].opponent.name || "TBD"} vs{" "}
                {match.opponents[1].opponent.name || "TBD"}
              </div>
              <div className={styles.MatchStatus}>Status: {match?.status}</div>
            </div>
            <div className={styles.TeamInfo}>
              <div style={{ borderRight: '2px solid grey', marginRight: '10px', padding: '10px', fontSize: '20px' }}>{match.opponents[1]?.opponent.name || "TBD"}</div>

              <img
                className={styles.TeamLogo}
                src={match.opponents[1].opponent.image_url || "/placeholder.png"}
                alt="Team Logo"
              />
            </div>
          </div>
        ))
      )}

    </div>
  );
};

ReactDOM.render(<LowerThird />, document.getElementById("root"))
