export default interface IPaginationFilter {
    page: number;
    perPage: number;
    sort?: {
        field: string;
        direction: 'ASC' | 'DESC';
    };
    [key: string]: any;
}