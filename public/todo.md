# March

## 2nd Week
<hr>

* MONDAY
  * Todo : 이메일 인증 완성
  * TIL
    * useEffect Loop : setInterval을 이용하는게 아닌 외부 useState과 setTimeout이용하기
  
```javascript
    const userEffectLoop = () => {
        const [looper, setLooper] = useState(0);
        useEffect(()=>{
            if(looper >= _END_TIME)
                return ;
            const timeout = setTimeout(()=>{ setLooper(looper + 1) }, _INTERVAL);
            
            // your codes~!!

            return () => clearTimeout(timeout)

        }, [looper]);

    }
```

<br>

* TUESDAY
  * Todo : 이메일, password format 검사 (client), 이메일 unique 설정
    * WEB : 1. Javascript 정규식으로 이메일, 비번 검사 // 2 이메일 중복 확인 // 3 시간되면 redux 예제만 이식하기
  
<br>

* WEDNESDAY
  * Todo : redux 자료구조 설정 and redux-persist => session객체 모두 전환

<br>

* THURSDAY
  * Todo : Spring Boot JWT 구현

<br>

* FRIDAY
  * Todo : Client JWT 구현

<br>


* Saturday
  * Todo : 비대칭키를 이용한 로그인 구현 완성

<br>

* Sunday
  * Todo : 1. 인증 메일 조회를 현재화면에서 하는 것 => 이미 DB값이 갱신되어서 로그인시 이메일 인증단계로 넘어가는 경우는 해결 => 대신 

<br>


## 3nd Week
<hr>