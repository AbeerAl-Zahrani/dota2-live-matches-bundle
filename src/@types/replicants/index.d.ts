import NodeCG from "@nodecg/types"
import { ValueOf } from "../value_of"

// Define the structure of the Dota 2 match data
export interface Match {
    id?: number;
    begin_at?: string;
    status?: string;
    league?: { name: string };
    serie?: { full_name: string };
    opponents?: { opponent: { name: string; image_url: string } }[];
  }

