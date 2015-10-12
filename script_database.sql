--validacion de campos de tiempo y fecha de la persona
create function proc_time_date() returns trigger
as $trg_timelive_date$
begin
	IF NEW.time_live IS NULL and NEW.time_date IS NULL 
	or NEW.time_live IS NOT NULL and NEW.time_date IS NOT NULL  
	THEN
            RAISE EXCEPTION 'no se pueden digilenciar los dos campos: time_live, time_date';
        END IF;
        IF NEW.time_date_last IS NOT NULL and NEW.time_date IS NULL THEN
            RAISE EXCEPTION 'Deben diligenciarse los dos campos de fechas';
        END IF;
end;
$trg_timelive_date$ LANGUAGE plpgsql;
create trigger trg_timelive_date
before insert
on person for each row
execute procedure proc_time_date();

