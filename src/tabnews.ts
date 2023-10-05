import { useFetch } from "@raycast/utils";
import { PostResponse, Strategy } from "./types";

const baseUrl = "https://www.tabnews.com.br/api/v1"
export function fetchContents({page = 1, limit = 10, strategy = Strategy.Relevant}) {
    return useFetch<Array<PostResponse>>(`${baseUrl}/contents?$page=${page}&per_page=${limit}&strategy=${strategy}`)
}