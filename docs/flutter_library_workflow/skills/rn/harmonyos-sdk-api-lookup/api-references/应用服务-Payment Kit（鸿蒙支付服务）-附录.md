## 获取对应的UTC过期时间示例



```
1. /**
2. * 获取UTC格式的过期时间
3. * @param expectedExpiredTime 交易过期时间，请换算为分钟
4. * @return UTC时间
5. */
6. private static String getTradeExpireTime(int expectedExpiredTime) {
7. SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
8. formater.setTimeZone(TimeZone.getTimeZone("UTC"));
9. Calendar calendar = Calendar.getInstance();
10. calendar.set(Calendar.MINUTE, calendar.get(Calendar.MINUTE) + expectedExpiredTime);
11. return formater.format(calendar.getTime());
12. }
```