export type CategoryName = { en: string } & Record<string, string | undefined>;

export interface Category {
  _id: string;
  name: CategoryName;
  slug: string;
  parentId?: string | null;
  icon?: string | null;
  flag?: string | null;
  image?: string | null;
  // API returns false when there are no children, otherwise an array of Category
  children: false | Category[];
}

export interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}
