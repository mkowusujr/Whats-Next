import { useEffect, useState } from 'react';
// import { Line } from 'react-charts'
import { Line } from 'recharts';
export default function CompletionChart(props) {
  // const data = [

  //     {x: "2019-01-03", y: 15}, {x: "2019-01-04", y: 18}

  // ];
  // const layout = {
  //   title: 'Sample Chart',
  //   xaxis: { title: 'X-axis' },
  //   yaxis: { title: 'Y-axis' }
  // };
  // return <Plot data={data} layout={layout} />;

  const [data, setData] = useState([]);

  let LineChart;

  const generateData = () => {
    const getMMYYYY = date =>
      new Date(date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'numeric'
      });

    const completedList = props.data;

    const mediaList = completedList.filter(i => i.c == 'watchnext');
    const mediaDatesSet = [...new Set(mediaList.map(m => getMMYYYY(m.dC)))];
    const mediaData = mediaDatesSet.map(m => ({
      x: m,
      y: mediaList.filter(i => getMMYYYY(i.dC) == m).length
    }));
    // console.log(mediaData);

    const bookList = completedList.filter(i => i.c == 'readnext');
    const bookDatesSet = [...new Set(bookList.map(b => getMMYYYY(b.dC)))];
    const bookData = bookDatesSet.map(m => ({
      x: m,
      y: bookList.filter(i => getMMYYYY(i.dC) == m).length
    }));
    // console.log(bookData);

    const bookDataSet = {
      label: 'Books',
      data: bookData, //dataList1.map(item => ({ x: item.x, y: item.y })),
      backgroundColor: 'rgba(75, 192, 192, 0.6)' // Optional background color for the line
    };

    const mediaDataSet = {
      label: 'Video Media',
      data: mediaData, //dataList2.map(item => ({ x: item.x, y: item.y })),
      backgroundColor: 'rgba(255, 99, 132, 0.6)' // Optional background color for the line
    };

    const datasets = [bookDataSet, mediaDataSet];
    LineChart = <Line data={mediaDataSet} />;
  };

  useEffect(() => {
    setData(generateData(props.data));
  }, []);
  return LineChart;
  // const convertListWithMonthAndAmount = list => {
  //   // Create objects to store the counts for each monthCompletedB and monthCompletedM
  //   const monthCountsB = {};
  //   const monthCountsM = {};

  //   // Iterate through the list to calculate the counts for each monthCompletedB and monthCompletedM
  //   list.forEach(item => {
  //     const dateCompleted = new Date(item.dC);
  //     const month = dateCompleted.getMonth();
  //     const year = dateCompleted.getFullYear();
  //     const key = `${year}-${month}`;

  //     if (item.c === 'readnext') {
  //       if (monthCountsB[key]) {
  //         monthCountsB[key]++;
  //       } else {
  //         monthCountsB[key] = 1;
  //       }
  //       // Add the 'monthCompletedB' property to the item
  //       item.monthCompletedB = `${year}-${month}`;
  //     } else if (item.c === 'watchnext') {
  //       if (monthCountsM[key]) {
  //         monthCountsM[key]++;
  //       } else {
  //         monthCountsM[key] = 1;
  //       }
  //       // Add the 'monthCompletedM' property to the item
  //       item.monthCompletedM = `${year}-${month}`;
  //     }
  //   });

  //   // Create a new list with 'amtB' and 'amtM' properties based on the counts
  //   const newList = list.map(item => ({
  //     ...item,
  //     amtB: monthCountsB[item.monthCompletedB] || 0,
  //     amtM: monthCountsM[item.monthCompletedM] || 0
  //   }));

  //   return newList;
  // };

  // return (
  //   <>
  //     <ResponsiveContainer width="100%" height="100%">
  //       <LineChart
  //         width={500}
  //         height={300}
  //         data={data}
  //         margin={{
  //           top: 5,
  //           right: 30,
  //           left: 20,
  //           bottom: 5
  //         }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis />
  //         <Tooltip />
  //         <Legend />
  //         <Line
  //           type="monotone"
  //           dataKey="amtM"
  //           stroke="#8884d8"
  //           activeDot={{ r: 8 }}
  //         />
  //         <Line type="monotone" dataKey="amtB" stroke="#82ca9d" />
  //       </LineChart>
  //     </ResponsiveContainer>
  //   </>
  // );
}
