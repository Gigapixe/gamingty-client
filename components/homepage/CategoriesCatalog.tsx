import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

interface Category {
  _id: string;
  name: {
    en: string;
  };
  slug: string;
  icon?: string;
  children?: Category[];
}

interface CategoriesCatalogProps {
  values?:
    | {
        status?: string;
        data?: Category[];
      }
    | Category[];
}

export default function CategoriesCatalog({ values }: CategoriesCatalogProps) {
  // Handle both array format and object format
  const data = Array.isArray(values) ? values : values?.data;
  const homeCategory = data?.[0];
  const categories = homeCategory?.children || [];

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="py-8 relative bg-linear-to-br from-gray-100 to-gray-200 dark:bg-linear-to-br dark:from-[#17092C] dark:via-[#0C0C1E] dark:to-[#04091A]">
      <div className="absolute inset-0 hidden dark:block"></div>
      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Browse Our Categories
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300 md:text-base text-sm">
            Explore our wide range of categories, from gaming essentials to
            accessories and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          {categories.map((mainCategory: any) => (
            <div key={mainCategory._id}>
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between p-6 lg:px-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-12 bg-primary rounded-full "></div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                        HOME
                      </span>
                      <h3 className="md:text-xl font-bold ">
                        {mainCategory.name.en}
                      </h3>
                    </div>
                  </div>
                  {mainCategory.children &&
                    mainCategory.children.length > 0 && (
                      <Link
                        href={`/category/${mainCategory.slug}`}
                        className="group flex items-center px-4 py-2 bg-primary/5 text-primary hover:bg-primary/10 dark:bg-primary/5 dark:text-primary dark:hover:bg-primary/20 transition-all duration-300 rounded-full"
                      >
                        <span className="text-sm font-medium mr-2 whitespace-nowrap">
                          View all
                        </span>
                        <FaLongArrowAltRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    )}
                </div>
                {mainCategory.children && mainCategory.children.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 p-6 lg:p-8">
                    {mainCategory.children.map((child: any) => (
                      <div
                        key={child._id}
                        className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md bg-white dark:bg-gray-700 transition-shadow duration-200 transform hover:-translate-y-0.5"
                      >
                        <Link href={`/category/${child.slug}`}>
                          <div className="relative overflow-hidden rounded-t-xl md:h-40">
                            <Image
                              src={child.icon || "/placeholder-category.jpg"}
                              alt={child.name.en}
                              width={420}
                              height={240}
                              className="object-cover w-full h-[101.88px] md:h-40 transform transition-transform duration-200 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                          </div>
                          <div className="py-3 rounded-b-xl">
                            <p className="text-content-default font-semibold text-center text-base px-2 line-clamp-1 dark:text-gray-200">
                              {child.name.en.length > 30
                                ? `${child.name.en.substring(0, 30)}...`
                                : child.name.en}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
