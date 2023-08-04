import { useEffect, useState } from 'react';
import { getSummary } from '../services/summary.service';
import '../sass/summary/Summary.scss';
import BasicTable from '../components/summary/BasicTable';
import { sortByOptions } from '../components/utils/FormFields';
import CompletionChart from '../components/summary/Chart';
import { fixDateTZ } from '../components/utils/utils';

export default function SummaryPage(props) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    document.title = "What's Next?";
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

  const isLastThreeMonths = dateString => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const ninetyDaysAgo = new Date(today);
      ninetyDaysAgo.setDate(today.getDate() - 90);

      return date >= ninetyDaysAgo && date < today;
    } catch (error) {
      // In case the dateString couldn't be parsed, return false
      return false;
    }
  };

  const isDateEarlierThanLastMonth = dateString => {
    try {
      // Convert the dateString to a Date object
      const dateObj = new Date(dateString);
      // Get the current month and year
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so we add 1
      const currentYear = new Date().getFullYear();
      // Get the first day of last month
      const startOfLastMonth = new Date(currentYear, currentMonth - 2, 1);
      return dateObj < startOfLastMonth;
    } catch (error) {
      // In case the dateString couldn't be parsed, return false
      return false;
    }
  };

  const timeStringToMinutes = timeString => {
    const parts = timeString.split(' ');

    let totalMinutes = 0;

    for (const part of parts) {
      if (part.includes('h')) {
        totalMinutes += parseInt(part) * 60;
      } else if (part.includes('m')) {
        totalMinutes += parseInt(part);
      }
    }

    return totalMinutes;
  };

  let inprogress,
    inProgressList,
    completedList,
    completedCurrMonth,
    completedLastMonth,
    completedLifeTime,
    pagesRead,
    minutesWatched;

  if (summary) {
    inprogress = [
      ...summary.inprogress.media.map(i => {
        return { ...i, id: `${i.id}m` };
      }),
      ...summary.inprogress.books.map(i => {
        return { ...i, id: `${i.id}b` };
      })
    ];

    inProgressList = [
      ...inprogress
        .filter(i => !sortByOptions.dStarted.findNullProps(i))
        .sort(sortByOptions.dStarted.sortBy),
      ...inprogress.filter(i => sortByOptions.dStarted.findNullProps(i))
    ].map(i => ({
      ...i,
      dS: i.dS ? fixDateTZ(i.dS) : '',
      dC: i.dC ? fixDateTZ(i.dC) : ''
    }));

    completedList = [
      ...summary.completed.media.map(i => {
        return {
          ...i,
          id: `${i.id}m`,
          dS: i.dS ? fixDateTZ(i.dS) : '',
          dC: i.dC ? fixDateTZ(i.dC) : ''
        };
      }),
      ...summary.completed.books.map(i => {
        return {
          ...i,
          id: `${i.id}b`,
          dS: i.dS ? fixDateTZ(i.dS) : '',
          dC: i.dC ? fixDateTZ(i.dC) : ''
        };
      })
    ]
      .filter(i => !sortByOptions.dCompleted.findNullProps(i))
      .sort(sortByOptions.dCompleted.sortBy)
      .reverse();

    completedCurrMonth = completedList.filter(i => isDateInCurrentMonth(i.dC));

    completedLastMonth = completedList.filter(i => isDateLastMonth(i.dC));

    completedLifeTime = completedList.filter(i =>
      isDateEarlierThanLastMonth(i.dC)
    );

    pagesRead = completedList
      .filter(i => isLastThreeMonths(i.dC) && i.c == 'readnext')
      .map(i => i.d)
      .reduce((acc, e) => acc + e, 0);

    minutesWatched = completedList
      .filter(i => isLastThreeMonths(i.dC) && i.c == 'watchnext')
      .map(i => +timeStringToMinutes(i.d))
      .reduce((acc, e) => acc + e, 0);
  }

  const getBookAndVideoNums = list => {
    if (list) {
      const books = list.filter(i => i.c == 'readnext').length;
      const videos = list.filter(i => i.c == 'watchnext').length;
      return ` of these ${books} were books and ${videos} were video media`;
    }
    return ``;
  };

  return (
    <div className="table-cols">
      {/* {completedList ? <CompletionChart data={completedList} /> : <></>} */}
      <div className="table-rows">
        <div className='read-watched-boxes'>
          <span className='box'>
            You've Read apx {pagesRead} pages in the last 3 months
          </span>
          <span className='box'>
           
              You've watched apx {minutesWatched} minutes in the last 3 months
           
          </span>
        </div>
        <div>
          <BasicTable
            title={`In Progress (${inProgressList?.length ?? 'Loading...'})`}
            dataList={inProgressList}
            imgUrlUtils={props.imgUrlUtils}
            showDC={false}
          />
        </div>
      </div>
      <div className="completed-tables">
        <BasicTable
          title={
            completedCurrMonth
              ? `Completed ${
                  completedCurrMonth.length
                } Items This Month ${getBookAndVideoNums(completedCurrMonth)}`
              : 'Loading...'
          }
          dataList={completedCurrMonth}
          imgUrlUtils={props.imgUrlUtils}
          showDC={true}
        />
        <BasicTable
          title={
            completedLastMonth
              ? `Completed ${
                  completedLastMonth?.length
                } Items Last Month ${getBookAndVideoNums(completedLastMonth)}`
              : 'Loading...'
          }
          dataList={completedLastMonth}
          imgUrlUtils={props.imgUrlUtils}
          showDC={true}
        />
        <BasicTable
          title={
            completedLifeTime
              ? `Completed ${
                  completedLifeTime.length
                } Items All Time ${getBookAndVideoNums(completedLifeTime)}`
              : 'Loading...'
          }
          dataList={completedLifeTime}
          imgUrlUtils={props.imgUrlUtils}
          showDC={true}
        />
      </div>
    </div>
  );
}
