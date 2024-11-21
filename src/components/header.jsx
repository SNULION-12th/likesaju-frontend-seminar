import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PointModal } from './modals/point-modal';
import coin from '../assets/icons/coin.png';
import { removeCookie } from '../utils/cookie';
import { signOut } from '../apis/api';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState, setUserProfile } from '../redux/user-slice';
import { ProfileImage } from '../components/profile-image';
import { FiMenu, FiX } from 'react-icons/fi';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 관리
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  const nickname = useSelector((state) => state.user.nickname);
  const point = useSelector((state) => state.user.remaining_points);
  const profileImgIndex = useSelector((state) => state.user.profilepic_id);
  const loggedIn = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLogin(loggedIn);
  }, []);

  const linkStyle =
    'text-base sm:text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer';
  const activeLinkStyle =
    'text-base sm:text-xl font-extrabold text-[#4A3AFF] leading-6';

  const onClickPoint = () => {
    setIsPointModalOpen(true);
  };

  const onClickLogout = async () => {
    const res = await signOut();
    if (res !== null) {
      removeCookie('access_token');
      removeCookie('refresh_token');
      dispatch(setLoginState(false));
      dispatch(
        setUserProfile({
          user: null,
          nickname: null,
          profilepic_id: null,
          remaining_points: null,
        }),
      );
      window.location.href = '/';
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-white shadow-md h-auto sm:h-[80px] px-4 sm:px-[68px] z-[999] py-3 sm:py-0">
      <div className="flex justify-between w-full sm:w-auto">
        <Link
          to="/"
          className="text-[20px] sm:text-[26px] font-extrabold text-[#14142B] leading-9 tracking-tighter"
        >
          멋쟁이 사주처럼
        </Link>
        <button
          className="sm:hidden text-2xl text-[#14142B]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } sm:flex flex-col sm:flex-row items-center gap-6 sm:gap-[80px] mt-2 sm:mt-0`}
      >
        <Link
          to="/saju"
          className={
            location.pathname === '/saju' ? activeLinkStyle : linkStyle
          }
          onClick={() => setMenuOpen(false)} // 메뉴 닫기
        >
          사주
        </Link>
        <Link
          to="/chat"
          className={
            location.pathname === '/chat' ? activeLinkStyle : linkStyle
          }
          onClick={() => setMenuOpen(false)} // 메뉴 닫기
        >
          채팅
        </Link>
        {isLogin ? (
          <div
            className="relative"
            onMouseOver={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <span className="text-base sm:text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer">
              프로필
            </span>
            {showProfile && (
              <div className="absolute top-[25px] right-[-25px] bg-white drop-shadow w-[200px] sm:w-[221px] p-4 sm:p-[25px] rounded-[12px] flex flex-col gap-5">
                {profileImgIndex && (
                  <div className="flex flex-row gap-[10px] items-center justify-start">
                    <ProfileImage
                      profileImageId={profileImgIndex}
                      additionalClassName={'w-[30px] h-[30px]'}
                    />
                    <span className="text-sm sm:text-lg font-bold text-[#170F49] leading-6">
                      {nickname}
                    </span>
                  </div>
                )}
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-[10px] items-center">
                    <img src={coin} alt="coin" className="w-[20px] sm:w-[30px] h-[20px] sm:h-[30px]" />
                    <span className="text-sm sm:text-lg font-bold text-[#170F49] leading-6">
                      포인트
                    </span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-[#4A3AFF] leading-6">
                    {point}
                    <span className="text-[#160F49]">P</span>
                  </span>
                </div>
                <button
                  onClick={onClickPoint}
                  className="bg-[#160F49] text-white text-xs sm:text-base font-semibold leading-6 rounded-[50px] px-4 py-2"
                >
                  충전하기
                </button>
                <span
                  onClick={onClickLogout}
                  className="text-xs sm:text-base font-normal underline text-[#160F49] self-start cursor-pointer"
                >
                  로그아웃
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="login"
            className="text-sm sm:text-xl font-bold text-[#4A3AFF] leading-6 bg-[#F3F1FF] px-4 sm:px-7 py-2 sm:py-[17px] rounded-[50px]"
            onClick={() => setMenuOpen(false)} // 메뉴 닫기
          >
            로그인
          </Link>
        )}
      </div>
      {isPointModalOpen && <PointModal setIsModalOpen={setIsPointModalOpen} />}
    </div>
  );
};
