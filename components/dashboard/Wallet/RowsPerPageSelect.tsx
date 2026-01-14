
"use client";

import Select, { type SelectOption } from "@/components/ui/Select"; 

type Props = {
  value: number;
  onChange: (n: number) => void;
  options: number[];
};

export default function RowsPerPageSelect({ value, onChange, options }: Props) {
  const opts: SelectOption[] = options.map((n) => ({
    value: String(n),
    label: `${n} row/page`,
  }));

  return (
    <div className="w-37.5">
      <Select
        value={String(value)}
        onChange={(val) => onChange(Number(val))}
        options={opts}
        searchable={false}
        placeholder="Rows/page"
        className="w-full"
        buttonClassName="rounded-md px-3 py-2 bg-[#FAFAFA] dark:bg-[#161616]"
      />
    </div>
  );
}
