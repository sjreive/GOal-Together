import { statusImage } from "../constants/image_ids";

const convertDateToString = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`
}

const determineUserAttendanceStatusAndImage = score => {
  if (score < 20) {
    return { statusName: "Sloth", imageId: statusImage.sloth }
  } else {
    return { statusName: "Eager Beaver", imageId: statusImage.beaver }
  }
};

export { convertDateToString, determineUserAttendanceStatusAndImage };