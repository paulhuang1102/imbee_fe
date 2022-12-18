export type Question = {
  title: string;
  link: string;
  id: number;
  isAnswered: boolean;
  viewCount: number;
  answerCount: number;
  score: number;
  owner: QuestionOwner;
};

export type QuestionOwner = {
  name: string;
  profileImage: string;
  id: number;
};
