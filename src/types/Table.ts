/**
 * 
 */
export interface Column<T> {
    title: string;
    field: keyof T;
    width?: number;
    render?: (row : T) => JSX.Element | null;
}

/**
 * 
 */
export interface Action {
    view?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
}

/**
 * 
 */
export interface TableProps<T> {
    data: T[];
    cols: Column<T>[];
    actions: Action;
    onView?:(item: T) => void;
    onCreate?: () => void;
    onUpdate?: (item: T) => void;
    onDelete?: (item: T) => void;
    customSearch?: (search: string) => Promise<T[]>;
}