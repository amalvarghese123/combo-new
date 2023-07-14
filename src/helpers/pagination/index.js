let getServerPagination = (pageData) => {
  const { docs, ...rest } = pageData;

  return [docs, rest];
};

export default getServerPagination;

//let [data, pagi] = getServerPagination(pagination);
