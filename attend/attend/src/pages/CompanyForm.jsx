import { useState } from "react";
import axios from "axios";

export default function CompanyForm({ company, onSave }) {
  const [form, setForm] = useState({
    name: company?.name || "",
    lat: company?.lat || "",
    lng: company?.lng || "",
    radius: company?.radius || 100,
  });

  const save = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/company", form);
      onSave(res.data);
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert("Error saving company");
    }
  };

  return (
    <div className="space-y-2">
      <input placeholder="Company name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="border p-2 rounded w-full" />
      <div className="grid grid-cols-3 gap-2">
        <input placeholder="Latitude" value={form.lat} onChange={(e)=>setForm({...form,lat:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Longitude" value={form.lng} onChange={(e)=>setForm({...form,lng:e.target.value})} className="border p-2 rounded" />
        <input placeholder="Radius (meters)" value={form.radius} onChange={(e)=>setForm({...form,radius:e.target.value})} className="border p-2 rounded" />
      </div>
      <button onClick={save} className="px-3 py-2 bg-green-600 text-white rounded">Save Company Geo</button>
    </div>
  );
}
