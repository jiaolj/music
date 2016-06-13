export PYTHONTEMP="/home/jiaolj/test/free/"
pid=`ps -ef|grep "python"|grep "$PYTHONTEMP"|grep -v "grep"|awk '{print $2}'`
if [ "$pid" = "" ] ; then
  echo "no tomcat pid alive"
else
  echo "kill pid $pid now"
  kill -9 $pid
fi
python /home/jiaolj/test/free/manage.py runfcgi host=127.0.0.1 port=8003 --settings=free.settings
