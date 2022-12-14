import {
  ChainId,
  useContractMetadata,
  useNetwork,
  useActiveClaimCondition,
  useEditionDrop,
  useNFT,
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useDisconnect,
  useNetworkMismatch,
  useClaimNFT,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useState, useEffect  } from "react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";
// Put Your Edition Drop Contract address from the dashboard here
const myEditionDropContractAddress =
  "0x34961f4b8b63074c469024F4876b4F1dD5730514";

const Home: NextPage = () => {
  const editionDrop = useEditionDrop(myEditionDropContractAddress);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // The amount the user claims, updates when they type a value into the input field.
  const [quantity, setQuantity] = useState<number>(1); // default to 1

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(
    myEditionDropContractAddress
  );

  const { data: nftMetadata } = useNFT(editionDrop, 0);

  const { mutate: mintNft, isLoading: isMinting } = useClaimNFT(editionDrop);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(0)
  );

  // Loading state while we fetch the metadata

  // Function to mint/claim an NFT
  async function mint() {
    // Make sure the user has their wallet connected.
    if (!address) {
      connectWithMetamask();
      return;
    }

    // Make sure the user is on the correct network (same network as your NFT Drop is).
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
      return;
    }

    try {
      mintNft(
        {
          quantity: quantity,
          to: address,
          tokenId: 0,
        },
        {
          onSuccess: (data) => {
            alert(`Successfully minted NFT${quantity > 1 ? "s" : ""}!`);
          },
          onError: (error) => {
            const e = error as Error;
            alert((e?.message as string) || "Something went wrong");
          },
        }
      );
    } catch (error) {
      const e = error as Error;
      alert((e?.message as string) || "Something went wrong");
    }
  }

  return (
    <>
    <div className="relative w-full h-full pb-10">
      <div className="hidden md:block">
          <img
            className="absolute bg-cover bg-center w-full h-full inset-0"
            src="https://i.ibb.co/QX9pbjN/Background.webp"
            alt=""
            />
      </div>
      <nav className="lg:hidden relative z-50">
          <div className="flex py-2 justify-between items-center px-4">
            <div>
                <img
                  src="https://i.ibb.co/SmcHgBh/Logo-texxt.png"
                  alt="logo"
                  />
            </div>
            <div className="visible flex items-center">
                <button
                  id="open"
                  className="focus:outline-none focus:ring-2 focus:ring-black"
                  >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/large_typography_with_gradient_and_glass_effect_Svg2.svg"
                  alt="menu"
                  />
                </button>
                <ul
                  id="list"
                  className="hidden p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-24"
                  >
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-blue-700 focus:text-blue-700 focus:outline-none">
                      <a
                        href="#home"
                        className="ml-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                      <span className="font-bold">Home</span>
                      </a>
                  </li>
                  <li
                      className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-blue-700 focus:text-blue-700 focus:outline-none"
                      >
                      <a
                        href="#about"
                        className="ml-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                      <span className="font-bold">About</span>
                      </a>
                  </li>
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-blue-700 flex items-center focus:text-blue-700 focus:outline-none">
                      <a
                        href="#invest"
                        className="ml-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                      <span className="font-bold">Invest</span>
                      </a>
                  </li>
                  <li
                      className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-blue-700 focus:text-blue-700 focus:outline-none"
                      >
                      <a
                        href="javascript: void(0)"
                        className="ml-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                      <span className="font-bold">Connect Wallet</span>
                      </a>
                  </li>
                </ul>
                <div className="xl:hidden">
                  <button
                      id="close"
                      className="hidden close-m-menu focus:ring-2 focus:ring-black focus:outline-none"
                      >
                  <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/large_typography_with_gradient_and_glass_effect_Svg3.svg"
                      alt="close"
                      />
                  </button>
                </div>
            </div>
          </div>
      </nav>
      <nav className="f-f-l relative z-10">
          <div className="relative z-10 mx-auto container hidden w-full px-4 xl:px-0 lg:flex justify-between items-center py-11">
            <div>
                <img
                  src="https://i.ibb.co/SmcHgBh/Logo-texxt.png"
                  alt="logo"
                  />
            </div>
            <div className="flex items-center text-white text-base font-medium">
                <ul className="flex items-center pr-3 xl:pr-12">
                  <li className="cursor-pointer hover:text-gray-300 ease-in">
                      <a
                        href="#home"
                        className="focus:outline-none focus:ring-2 focus:ring-white"
                        >
                      Home
                      </a>
                  </li>
                  <li className="pl-3 lg:pl-5 xl:pl-8 cursor-pointer hover:text-gray-300 ease-in">
                      <a
                        href="#about"
                        className="focus:outline-none focus:ring-2 focus:ring-white"
                        >
                      About
                      </a>
                  </li>
                  <li className="pl-3 lg:pl-5 xl:pl-8 cursor-pointer hover:text-gray-300 ease-in">
                      <a
                        href="#invest"
                        className="focus:outline-none focus:ring-2 focus:ring-white"
                        >
                      Invest
                      </a>
                  </li>
                </ul>
                {address ? (
                <>
                <button onClick={disconnectWallet} className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white text-base font-medium rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
                Disconnect
                </button>
                </>
                ) : (
                <button onClick={connectWithMetamask} className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white text-base font-medium rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
                Connect Wallet
                </button>
                )}
            </div>
          </div>
      </nav>
          <div id="home" className="relative px-4 xl:px-0 container mx-auto md:flex items-center gap-8">
            <div className="text-color w-full md:w-1/3 pt-16 lg:pt-32 xl:pt-12">
                <h1 className="text-4xl md:text-4xl lg:text-6xl w-11/12 lg:w-11/12 xl:w-full xl:text-6xl text-gray-900 font-extrabold f-f-l">
                Lets invest to help build health facilities.
                </h1>
                <div className="f-f-r text-base lg:text-base pb-20 sm:pb-0 pt-10 xl:pt-6">
                  <h2>
                  DApp to help you invest in health facilities 
                  through the NFT printing system, with the MATIC 
                  currency based on the Polygon Blockchain. Mint NFT, get your investment certificate.</h2>
                </div>
                <div className="lg:flex">
                  <button className="hidden md:block hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4  bg-blue-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-lg">
                  <a href="#invest">Invest Now!</a>
                  </button>
                </div>
            </div>
            <img
                className="w-full mt-8 md:mt-0 object-fill md:w-2/3 md:-ml-4 lg:-ml-4 xl:ml-0"
                src="https://i.ibb.co/Rbsshfm/Hero.webp"
                alt="sample page"
                role="img"
                />
            <button className="md:hidden hover:opacity-90 text-base w-full xl:text-base xl:w-6/12 mt-4 xl:mt-8 f-f-r py-4  bg-blue-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-lg">
            <a href="#invest">Invest Now!</a>
            </button>
          </div>
      </div>
      {/* ABOUT */}
      <div id="about" className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
          <div className="lg:w-10/12 w-full">
            <p className="font-normal text-sm leading-3 text-blue-700 hover:text-blue-800 cursor-pointer">About</p>
            <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">We are here to help distribute health facilities in remote areas using new technology.</h2>
            <p className="font-normal text-base leading-6 text-gray-600 mt-6">a lot of people complain about the uneven distribution of health facilities 
in Indonesia, so that almost everyone in remote areas has to go to the
city to get these health facilities. Healthfund has a goal is to help build clinics 
in remote areas with an NFT minting system for people to invest.</p>
          </div>
          <div className="lg:mt-14 sm:mt-10 mt-12">
            <img className="lg:block hidden w-full" src="https://i.ibb.co/p2Td5f2/Sec2-panjang.webp" alt="Group of people Chilling" />
            <img className="lg:hidden sm:block hidden w-full" src="https://i.ibb.co/p2Td5f2/Sec2-panjang.webp" alt="Group of people Chilling" />
            <img className="sm:hidden block w-full" src="https://i.ibb.co/p2Td5f2/Sec2-panjang.webp" alt="Group of people Chilling" />
          </div>
          <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
            <div className="w-full xl:w-5/12 lg:w-6/12">
                <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Mint NFT, get your investment certificate!</h2>
                <p className="font-normal text-base leading-6 text-gray-600 mt-4">HealthFund makes you obtain NFT but not with 
selling unique paintings or drawings, instead with the 
certificate that the user got from minting, 
which contains the program for the construction of health facilities and 
the value for money of your investment.</p>
                <p className="font-normal text-base leading-6 text-gray-600 mt-6">Every time you mint NFT, you are entitled to the investment in the construction of the clinic according to the event.</p>
            </div>
            <div className="lg:flex items-center w-full lg:w-1/2 ">
                <img className="lg:block hidden w-full" src="https://i.ibb.co/RQ5THZf/NFT-HF-1.webp" alt="people discussing on board" />
                <img className="lg:hidden sm:block hidden w-full h-3/4" src="https://i.ibb.co/RQ5THZf/NFT-HF-1.webp" alt="people discussing on board" />
                <img className="sm:hidden block w-full" src="https://i.ibb.co/RQ5THZf/NFT-HF-1.webp" alt="people discussing on board" />
            </div>
          </div>
      </div>
      {/* MINTING */}
      <div id="invest" className="bg-gray-100 overflow-y-hidden">
          <div className="mx-auto container py-12 px-4">
            <div className="w-full flex justify-center">
                <div className="w-full md:w-11/12 xl:w-10/12 bg-gradient-to-r from-blue-500 to-blue-700 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16">
                  <div>
                      <div className="flex flex-wrap items-center md:flex-row flex-col-reverse">
                        <div className="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4">
                            <div>
                              <h1 role="heading" className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-10/12 text-white font-black leading-6 lg:leading-10 md:text-left text-center">Funding for the building of the first clinic has been opened, invest now, worth 0.1 MATIC per NFT.</h1>
                            </div>
                            <br/>
                            {/* Show claim button or connect wallet button */}
                            {address ? (
                            <>
                            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1} type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">-</button> 
                            <button className="focus:outline-none text-black bg-blue-100 focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-100 dark:focus:ring-blue-800">{quantity}</button>
                            <button onClick={() => setQuantity(quantity + 1)} disabled={ quantity >= parseInt(activeClaimCondition?.quantityLimitPerTransaction || "0")} type="button" className="relative  focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
                            <br/>
                            <button
                              className="mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-blue-700 rounded-lg text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none"
                              onClick={mint}
                              disabled={isMinting}
                              >
                            {isMinting ? "Minting..." : "Mint"}
                            </button>
                            </>
                            ) : (
                            <button className="mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-blue-700 rounded-lg text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none" onClick={connectWithMetamask}>
                            Connect Wallet
                            </button>
                            )}
                        </div>
                        <div className="md:w-1/3 w-2/3">
                            <img src="https://i.ibb.co/Pj8jQkG/Desain-tanpa-judul-4.png" alt="cartoon avatars" />
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      {/*Footer*/}
      <div className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 px-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <div>
                <img
                  src="https://i.ibb.co/SmcHgBh/Logo-texxt.png"
                  alt="logo"
                  />
            </div>
            <div className="flex items-center mt-6">
                <p className="text-base leading-4 text-gray-800">
                  2022 <span className="font-semibold">HEALTHFUND</span>
                </p>
                <div className="border-l border-gray-800 pl-2 ml-2">
                  <p className="text-base leading-4 text-gray-800">Inc. All rights reserved</p>
                </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;
