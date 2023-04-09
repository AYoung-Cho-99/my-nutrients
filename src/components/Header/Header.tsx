import Link from "next/link";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from "@components/header/Header.module.scss";
import { useRouter } from 'next/router';
import { login, logout, onUserStateChange } from "@src/assets/ts/firebase";

function Header() {
  const router = useRouter();
  const [indexs, setIndexs] = useState(0);
  const [user, setUser] = useState<any>(null); // 로그인

  
  const handleLogin = () => {
    login().then(setUser); //로그인이 된다면 user를 지정해줌
  }
  const handleLogout = () => {
    logout().then(setUser);
  }

  // useEffect(() => {
  //   if ((router.asPath).match('/teacher_list')) {
  //     setIndexs(1);
  //   } else if ((router.asPath).match('/lecture_list')) {
  //     setIndexs(2);
  //   } else if ((router.asPath).match('/')) {
  //     setIndexs(0);
  //   }
  // }, [router.asPath]);
  
  useEffect(() => {
    onUserStateChange((user: any) => { // 로그인 되어있다면 사용자의 정보 전달해서 setUser 업데이트
      setUser(user);
    });
  }, [user]);

  console.log(user);
  return (
    <header>
      <div className={`${styles.header} flex justify-between border-b border-gray-300 p-2`}>
        <div>
          <h1 className={styles.logo}>ddd</h1>
        </div>
        <nav className={styles.gnb}>
          {/* <ul>
            <li className={indexs === 0 ? styles.on : ''} onClick={() => setIndexs(0)}>
              <button
                onClick={() => router.push("/teacher_list")}>
                <span>선생님</span>
              </button>
            </li>
            <li className={indexs === 1 ? styles.on : ''} >
              <button
                type="button"
                onClick={() => {
                  setIndexs(1);
                  router.push({ pathname: "/lecture_list", query: { subMenu: "lectureUnit" } });
                }}
              >
                <span>수강신청</span>
              </button>
            </li>
          </ul> */}
          {!user && <button onClick={handleLogin}>로그인</button>}
          {user && <button onClick={handleLogout}>로그아웃</button>}
        </nav>
      </div>
    </header >

  );
}

export default Header;

