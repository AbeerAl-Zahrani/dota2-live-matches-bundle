import NodeCG from "@nodecg/types"
import { LOWERTHIRDS_HOST } from "../common/replicants"
import { Match } from "../@types/replicants"
import axios from 'axios'
export = (nodecg: NodeCG.ServerAPI) => {
    nodecg.sendMessage("message")

    const lowerThirdLeft = nodecg.Replicant<Match>(LOWERTHIRDS_HOST.NAME, LOWERTHIRDS_HOST.NAME_SPACE)
    async function fetchDota2Matches() {
        try {
            const response = await axios.get(`https://api.pandascore.co/dota2/matches/running?running=true`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.PANDA_API_TOKEN}`,
                },
            });

            const matches = response.data;
            
            lowerThirdLeft.value = matches; // Update the replicant with the fetched data
            nodecg.log.info(`Fetched ${matches.length} Dota 2 matches.`);
        } catch (error) {
            nodecg.log.error("Error fetching Dota 2 matches:");
        }
    }

    // Fetch data on server startup
    fetchDota2Matches();

    // Set an interval to fetch data every 5 minutes (300,000 ms)
    // setInterval(fetchDota2Matches, 300000);

    // manual trigger
    nodecg.listenFor("fetchDota2Data", async () => {
        try {
            await fetchDota2Matches();

        } catch (error) {
            nodecg.log.error("Error fetching Dota 2");

        }
    })
}
