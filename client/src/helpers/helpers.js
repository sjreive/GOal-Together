import { statusImage, commitmentImage } from "../constants/image_ids";

const convertDateToString = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

const determineUserAttendanceStatusAndImage = (score, activityCount) => {
  if (score === 0 && activityCount === 0) {
    return { statusName: "New But Excited Kitty", imageId: statusImage.kitty };
  } else if (score < 20) {
    return {
      statusName: "Don't Hold Your Breath Sloth",
      imageId: statusImage.sloth
    };
  } else if (score < 40) {
    return { statusName: "Getting There Turtle", imageId: statusImage.turtle };
  } else if (score < 60) {
    return { statusName: "Distractible Pup", imageId: statusImage.pup };
  } else if (score < 80) {
    return { statusName: "Busy Bee", imageId: statusImage.bee };
  } else {
    return { statusName: "Eager Beaver", imageId: statusImage.beaver };
  }
};

const determineCommitmentImage = category => {
  if (category === "Fitness") {
    return commitmentImage.fitness;
  } else if (category === "Social") {
    return commitmentImage.social;
  } else if (category === "Reading") {
    return commitmentImage.reading;
  } else if (category === "Academic") {
    return commitmentImage.academic;
  } else {
    return commitmentImage.other;
  }
};

const findTopTenAttendanceMembers = members => {};

const findUserCommitmentScore = (email, members) => {
  let userCommitmentScore = 0;
  for (const member in members) {
    if (members[member].email === email) {
      userCommitmentScore = members[member].commitment_score;
    }
  }
  return userCommitmentScore;
};

export {
  convertDateToString,
  determineUserAttendanceStatusAndImage,
  findTopTenAttendanceMembers,
  determineCommitmentImage,
  findUserCommitmentScore
};
