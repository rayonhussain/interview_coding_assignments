-- Environemnt PostgreSQL v9.6

/* Using this dataset, show the SQL query to find the rolling 3 day average transaction amount for each day in January 2021. */
with sql_temp as 
	(select 
     	date(transaction_time) as transaction_date, 
     	sum(transaction_amount) as transaction_amount  
 	from transactions 
     where date(transaction_time) between '2021-01-01' and '2021-01-31'
    group by date(transaction_time))


select 
	transaction_date, 
	(avg(transaction_amount) over (order by transaction_date
                                  rows between 2 preceding and current row)) 
    as rolling_3day_avg_amt
    from sql_temp where transaction_date='2021-01-31';