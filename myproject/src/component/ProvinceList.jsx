import React, { useEffect, useState } from "react";

function ProvinceList() {
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
    )
      .then((response) => response.json())
      .then((result) => {
        setProvinces(result);
      });
  }, []);

  const DropdownList = ({
    label,
    id,
    list,
    child,
    childsId = [],
    setChilds = [],
  }) => {
    const onChangeHandle = (event) => {
      setChilds.forEach((setChild) => setChild([]));
      const entries = childsId.map((child) => [child, undefined]);
      const unSelectChilds = Object.fromEntries(entries);

      const input = event.target.value;
      const dependId = input ? Number(input) : undefined;
      setSelected((prev) => ({ ...prev, ...unSelectChilds, [id]: dependId }));

      if (!input) return;

      if (child) {
        const parent = list.find((item) => item.id === dependId);
        const { [child]: childs } = parent;
        const [setChild] = setChilds;
        setChild(childs);
      }
    };

    return (
      <div className="dropdown mb-4">
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          value={selected[id]}
          onChange={onChangeHandle}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select ...
          </option>
          {list &&
            list.map((item) => (
              <option
                key={item.id}
                value={item.id}
                label={`${item.name_th} - ${item.name_en}`}
              />
            ))}
        </select>
      </div>
    );
  };

  return (
    <div className="province-list">
      <DropdownList
        label="จังหวัด: "
        id="province_id"
        list={provinces}
        child="amphure"
        childsId={["amphure_id", "tambon_id"]}
        setChilds={[setAmphures, setTambons]}
      />

      <DropdownList
        label="อำเภอ: "
        id="amphure_id"
        list={amphures}
        child="tambon"
        childsId={["tambon_id"]}
        setChilds={[setTambons]}
      />

      <DropdownList label="ตำบล: " id="tambon_id" list={tambons} />
    </div>
  );
}

export default ProvinceList;
