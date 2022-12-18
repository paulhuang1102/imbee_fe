import HttpAgent from "./httpAgent";

const agent = new HttpAgent("https://api.stackexchange.com/2.3");

export const getTrendings = (inname?: string) =>
  agent.request(
    "GET",
    `/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow${
      inname ? `&inname=${inname}` : ""
    }`
  );

export const getQuestions = (tag: string, page: number, size: number = 20) =>
  agent.request(
    "GET",
    `/questions?page=${page}&pagesize=${size}&order=desc&sort=activity&tagged=${tag}&site=stackoverflow`
  );
