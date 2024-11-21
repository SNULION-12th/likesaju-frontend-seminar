import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PointModal } from './modals/point-modal';
import coin from '../assets/icons/coin.png';
import { removeCookie } from '../utils/cookie';
import { signOut } from '../apis/api';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState, setUserProfile } from '../redux/user-slice';
import { ProfileImage } from '../components/profile-image';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
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
    'text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer';
  const activeLinkStyle = 'text-xl font-extrabold text-[#4A3AFF] leading-6';

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
    <div className="sticky top-0 w-full flex flex-row items-center justify-between bg-white drop-shadow h-[80px] px-[68px] z-[999]">
      <Link
        to="/"
        className="text-[26px] font-extrabold text-[#14142B] leading-9 tracking-tighter mobile:text-base"
      >
        멋쟁이 사주처럼
      </Link>
      <div className="flex flex-row items-center gap-[50px]">
        <Link
          to="/saju"
          className={`${
            location.pathname === '/saju' ? activeLinkStyle : linkStyle
          } mobile:text-sm`}
        >
          사주
        </Link>
        <Link
          to="/chat"
          className={`${
            location.pathname === '/saju' ? activeLinkStyle : linkStyle
          } mobile:text-sm`}
        >
          채팅
        </Link>
        {isLogin ? (
          <div
            className="relative"
            onMouseOver={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <span className="text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer mobile:text-sm">
              프로필
            </span>
            {showProfile && (
              <div className="absolute top-[25px] right-[-25px] bg-white drop-shadow w-[221px] p-[25px] rounded-[12px] flex flex-col gap-5 mobile:top-[15px] mobile:right-[-15px] mobile:w-[180px] mobile:p-3 mobile:gap-3">
                {profileImgIndex && (
                  <div className="flex flex-row gap-[10px] items-center justify-start mobile:gap-2">
                    <ProfileImage
                      profileImageId={profileImgIndex}
                      additionalClassName={
                        'w-[30px] h-[30px] mobile:w-[25px] mobile:h-[25px]'
                      }
                    />
                    <span className="text-lg font-bold text-[#170F49] leading-6 mobile:text-sm mobile:leading-5">
                      {nickname}
                    </span>
                  </div>
                )}
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-[10px] items-center mobile:gap-2">
                    <img
                      src={coin}
                      alt="coin"
                      className="w-[30px] h-[30px] mobile:w-[25px] mobile:h-[25px]"
                    />
                    <span className="text-lg font-bold text-[#170F49] leading-6 mobile:text-sm mobile:leading-5">
                      포인트
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[#4A3AFF] leading-6 mobile:text-sm mobile:leading-5">
                    {point}
                    <span className="text-[#160F49]">P</span>
                  </span>
                </div>
                <button
                  onClick={onClickPoint}
                  className="bg-[#160F49] text-white text-base font-semibold leading-6 rounded-[50px] px-6 py-[6px] mobile:text-sm mobile:leading-5 mobile:py-[4px] mobile:px-4"
                >
                  충전하기
                </button>
                <span
                  onClick={onClickLogout}
                  className="text-base font-normal underline text-[#160F49] self-start cursor-pointer mobile:text-sm"
                >
                  로그아웃
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="login"
            className="text-xl font-bold text-[#4A3AFF] leading-6 bg-[#F3F1FF] px-7 py-[17px] rounded-[50px] mobile:text-sm mobile:px-5 mobile:py-3"
          >
            로그인
          </Link>
        )}
      </div>
      {isPointModalOpen && <PointModal setIsModalOpen={setIsPointModalOpen} />}
    </div>
  );
};
