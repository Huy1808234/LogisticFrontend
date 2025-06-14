import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

interface Option {
  label: string;
  value: number;
}

interface ProvinceProps {
  onChange: (code: number, label: string) => void;
}

interface DistrictProps {
  provinceCode: number;
  onChange: (district: string) => void;
}

// === Province Select ===
export const Province: React.FC<ProvinceProps> = ({ onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get("/api/address/provinces", {
          withCredentials: true,
        });
        const data = res.data.map((item: any) => ({
          label: item.name,
          value: item.code,
        }));
        setOptions(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành:", err);
      }
    };
    fetchProvinces();
  }, []);

  return (
    <Select
      options={options}
      onChange={(selected) =>
        selected && onChange(selected.value, selected.label)
      }
      placeholder="Chọn tỉnh/thành"
      isClearable
    />
  );
};

// === District Select ===
export const District: React.FC<DistrictProps> = ({
  provinceCode,
  onChange,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!provinceCode) return;
      try {
        const res = await axios.get(
          `/api/address/districts?provinceCode=${provinceCode}`,
          {
            withCredentials: true,
          }
        );
        const data = res.data.map((d: any) => ({
          label: d.name,
          value: d.name,
        }));
        setOptions(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách quận/huyện:", err);
      }
    };
    fetchDistricts();
  }, [provinceCode]);

  return (
    <Select
      options={options}
      onChange={(selected) => selected && onChange(selected.value)}
      placeholder="Chọn quận/huyện"
      isClearable
    />
  );
};

export const AddressSelect = { Province, District };
export default AddressSelect;
