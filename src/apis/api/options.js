import instance from "../utils/instance";

export const getAllCategoryRequest = async () => {
    return await instance.get("/admin/book/option/categories");
}
export const getAllBookTypeRequest = async () => {
    return await instance.get("/admin/book/option/types");
}