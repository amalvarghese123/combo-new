const getProfileImg = (photo) => {
  const poto = photo
    ? `${process.env.REACT_APP_PHOTOS}/${photo}`
    : "/images/profileIcon.jpg";
  return poto;
};

export default getProfileImg;
