import { ASSETS, EAsset } from '@/constants/Assets';
import { Box, BoxProps, chakra } from '@chakra-ui/react';
import { BiMoneyWithdraw } from 'react-icons/bi';
import {
  FaBtc,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub,
  FaRegCalendarPlus,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from 'react-icons/fa';
import { FaBookSkull } from 'react-icons/fa6';
import { FiAlertTriangle } from 'react-icons/fi';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { HiMiniArrowPathRoundedSquare } from 'react-icons/hi2';
import { IoWalletOutline } from 'react-icons/io5';
import { LuChevronDown, LuSlidersHorizontal } from 'react-icons/lu';
import { MdInfoOutline, MdShoppingCartCheckout } from 'react-icons/md';
import { TbClockX, TbEyeOff, TbTransferIn } from 'react-icons/tb';

export const IconFilter = chakra(LuSlidersHorizontal);
export const IconChevronDown = chakra(LuChevronDown);

export const IconCheck = chakra(FaCheck);

// export const IconError = chakra(MdOutlineReportGmailerrorred);

// Alerts
export const IconCheckCircle = chakra(FaRegCheckCircle);
export const IconError = chakra(FaRegTimesCircle);
export const IconWarning = chakra(FiAlertTriangle);

// Mortgage
export const IconForeclosed = chakra(FaBookSkull);
export const IconRedeem = chakra(BiMoneyWithdraw);

// Arrow
export const IconArrowRight = chakra(HiOutlineArrowSmRight);
export const IconArrowLeft = chakra(HiOutlineArrowSmLeft);

export const IconPayment = chakra(MdShoppingCartCheckout);
export const IconTransfer = chakra(TbTransferIn);
export const IconExtend = chakra(FaRegCalendarPlus);
export const IconWallet = chakra(IoWalletOutline);

export const IconInfo = chakra(MdInfoOutline);

export const IconBtc = chakra(FaBtc);

export const IconExpired = chakra(TbClockX);
export const IconHidden = chakra(TbEyeOff);

export const IconSwitch = chakra(HiMiniArrowPathRoundedSquare);

export const IconExternalLink = chakra(FaExternalLinkAlt);

export const GithubIcon = chakra(FaGithub);

export const AssetIcon = ({
  asset,
  ...props
}: { asset: EAsset } & BoxProps) => {
  return (
    <Box
      bgImage={ASSETS[asset].icon}
      w={{ base: '14px', md: '18px' }}
      h={{ base: '14px', md: '18px' }}
      bgSize="contain"
      bgRepeat="no-repeat"
      {...props}
    />
  );
};

interface IHlnLogoProps extends BoxProps {
  size?: string;
}
export const HlnLogo = ({ size = '34px' }: IHlnLogoProps) => {
  return (
    <Box
      transition="opacity 0.1s linear"
      _active={{ opacity: '0.8 !important' }}
    >
      <Box
        width={size}
        height={size}
        bgImage="url('/hln.svg')"
        bgRepeat="no-repeat"
        bgSize="contain"
      />
    </Box>
  );
};
