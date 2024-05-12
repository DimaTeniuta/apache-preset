import { useState } from 'react';

const parseData = (obj: unknown): unknown => {
  if (typeof obj !== 'object') {
    if (typeof obj === 'string') {
      return obj[0] === '{' ? JSON.parse(obj) : obj;
    }

    return obj;
  }

  if (obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => parseData(item));
  }

  return Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = value[0] === '{' ? JSON.parse(value) : value;
    } else if (value === null || typeof value !== 'object') {
      acc[key] = value;
    } else if (Array.isArray(value)) {
      acc[key] = value.map((item) => parseData(item));
    } else {
      acc[key] = parseData(value);
    }
    return acc;
  }, {});
};

const APIDashboardPage = () => {
  const [data, setData] = useState<string>('');

  const getData = () => {
    const obj = JSON.parse(data);
    console.log(console.log(parseData(obj)));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleClear = () => {
    setData('');
  };

  return (
    <div>
      <h1 style={{ margin: '10px auto 0' }}>API Dashboard</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: '500px',
          margin: '30px auto 0'
        }}
      >
        <input
          value={data}
          onChange={handleChangeInput}
          style={{ height: '32px', fontSize: '1rem' }}
          placeholder="Response object"
        />
        <button style={{ background: 'green', color: 'white', height: '32px' }} onClick={getData}>
          Parse Data
        </button>
        <button style={{ background: 'red', color: 'white', height: '32px' }} onClick={handleClear}>
          Clear Input
        </button>
      </div>
    </div>
  );
};

export default APIDashboardPage;
