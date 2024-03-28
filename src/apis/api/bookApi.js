import instance from "../utils/instance"

export const registerBook = async (data) => {
    return await instance.post("/admin/book", data);
}

export const searchBooksRequest = async (params) => {
    return await instance.get("/admin/books", {params});
}
export const getBookCountRequest = async (params) => {
    return await instance.get("/admin/books/count", {params});
}

export const deleteBooksRequest = async (data) => {
    return await instance.delete("/admin/books/delete", {data});
}
export const updateBookRequest = async (data) => {
    return await instance.put(`/admin/book/${data.bookId}`, data);
}

/**
 * 
 * post 요청(주소, 데이터(객체=>Json화), {headers:{}, config})
 * get  요청(주소, {headers:{}, params:{key: value}}) --객체를 params안에 넣어서 제공하는 편
 * delete요청(주소,{headers:{}, data: {key: value}}) --객체를 data안에 넣어서 제공하는 편
 */