const deparam = (url) => {
    let searchParams = new URLSearchParams(url);
    let obj = {};
    for(let item of searchParams) {
      obj[item[0]]= item[1];
    };
    return obj;
};
