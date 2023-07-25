import { useEffect, useState } from 'react';
import { getSummary } from '../services/summary.service';
// import '../sass/media/MediaRow.scss';
import '../sass/summary/Summary.scss';
import BasicTable from '../components/summary/BasicTable';
import { sortByOptions } from '../components/utils/FormFields';

export default function SummaryPage(props) {
  const [summary, setSummary] = useState({
    inprogress: { media: [], books: [] },
    completed: { media: [], books: [] }
  });

  useEffect(() => {
    document.title = 'Next?';
    getSummary().then(s => setSummary(s));
  }, []);

  const isDateInCurrentMonth = dateString => {
    try {
      // Convert the dateString to a Date object
      const dateObj = new Date(dateString);
      // Get the current month and year
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so we add 1
      const currentYear = new Date().getFullYear();
      // Check if the date is in the current month and year
      return (
        dateObj.getMonth() + 1 === currentMonth &&
        dateObj.getFullYear() === currentYear
      );
    } catch (error) {
      // In case the dateString couldn't be parsed, return false
      return false;
    }
  };

  const isDateLastMonthToStartOfYear = dateString => {
    try {
      // Convert the dateString to a Date object
      const dateObj = new Date(dateString);
      // Get the current year
      const currentYear = new Date().getFullYear();
      // Get the first day of the current year
      const startOfYear = new Date(currentYear, 0, 1);
      // Get the first day of last month
      const startOfLastMonth = new Date(currentYear, new Date().getMonth(), 1);
      // Check if the date is between startOfLastMonth and startOfYear
      return dateObj >= startOfLastMonth && dateObj < startOfYear;
    } catch (error) {
      // In case the dateString couldn't be parsed, return false
      return false;
    }
  };

  const isDateLastYearOrEarlier = dateString => {
    try {
      // Convert the dateString to a Date object
      const dateObj = new Date(dateString);
      // Get the current year
      const currentYear = new Date().getFullYear();
      // Get the first day of the current year
      const startOfYear = new Date(currentYear, 0, 1);
      // Check if the date is before the start of the current year
      return dateObj < startOfYear;
    } catch (error) {
      // In case the dateString couldn't be parsed, return false
      return false;
    }
  };

  const isDateLastMonth = dateString => {
    try {
      // Convert the dateString to a Date object
      const dateObj = new Date(dateString);
      // Get the current month and year
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so we add 1
      const currentYear = new Date().getFullYear();
      // Get the first day of the current month
      const startOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
      // Get the first day of last month
      const startOfLastMonth = new Date(currentYear, currentMonth - 2, 1);
      // Check if the date is between startOfLastMonth (inclusive) and startOfCurrentMonth (exclusive)
      return dateObj >= startOfLastMonth && dateObj < startOfCurrentMonth;
    } catch (error) {
      // In case the dateString couldn't be parsed, return false
      return false;
    }
  };

  const inprogress = [
    ...summary.inprogress.media.map(i => {
      return { ...i, id: `${i.id}m` };
    }),
    ...summary.inprogress.books.map(i => {
      return { ...i, id: `${i.id}b` };
    })
  ];

  const inProgressList = [
    ...inprogress
      .filter(i => !sortByOptions.dStarted.findNullProps(i))
      .sort(sortByOptions.dStarted.sortBy),
    ...inprogress.filter(i => sortByOptions.dStarted.findNullProps(i))
  ];

  const compledtedList = [
    ...summary.completed.media.map(i => {
      return { ...i, id: `${i.id}m` };
    }),
    ...summary.completed.books.map(i => {
      return { ...i, id: `${i.id}b` };
    })
  ]
    .filter(i => !sortByOptions.dCompleted.findNullProps(i))
    .sort(sortByOptions.dCompleted.sortBy)
    .reverse();

  const inprogressCurrMonth = inProgressList.filter(i =>
    isDateInCurrentMonth(i.dS)
  );

  const inprogressTooLong = inProgressList.filter(i =>
    isDateLastMonthToStartOfYear(i.dS)
  );

  const compledtedCurrMonth = compledtedList.filter(i =>
    isDateInCurrentMonth(i.dC)
  );

  const compledtedLastMonth = compledtedList.filter(i => isDateLastMonth(i.dC));

  const compledtedLifeTime = compledtedList.filter(i =>
    isDateLastYearOrEarlier(i.dC)
  );

  return (
    <>
      <div className="table-cols">
        <div className="table-rows">
          <div>
            <BasicTable
              title={`In Progress This Month (${inprogressCurrMonth.length})`}
              dataList={inprogressCurrMonth}
              imgUrlUtils={props.imgUrlUtils}
              showDC={false}
            />
          </div>
          <div>
            <BasicTable
              title={`In Progress Last Month And Prior (${inprogressTooLong.length})`}
              dataList={inprogressTooLong}
              imgUrlUtils={props.imgUrlUtils}
              showDC={false}
            />
          </div>
        </div>
        <div className="completed-tables">
          <BasicTable
            title={`Completed This Month (${compledtedCurrMonth.length})`}
            dataList={compledtedCurrMonth}
            imgUrlUtils={props.imgUrlUtils}
            showDC={true}
          />
          <BasicTable
            title={`Completed Last Month (${compledtedLastMonth.length})`}
            dataList={compledtedLastMonth}
            imgUrlUtils={props.imgUrlUtils}
            showDC={true}
          />
          <BasicTable
            title={`Completed All Time (${compledtedLifeTime.length})`}
            dataList={compledtedLifeTime}
            imgUrlUtils={props.imgUrlUtils}
            showDC={true}
          />
        </div>
      </div>
    </>
  );
}
