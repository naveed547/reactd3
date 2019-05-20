import { TransactionData } from '../../store/types';
export interface PaginationProps {
    items: TransactionData[];
    onChangePage: (num) => void;
    initialPage?: number;
    pageSize?: number;
}
