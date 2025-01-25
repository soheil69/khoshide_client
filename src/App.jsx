import { useState, useEffect } from "react";
import { parseHashToModel } from "./util.js";

function App() {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [hashModel, setHashModel] = useState(null);

    useEffect(() => {
        const model = parseHashToModel(window.location.hash.substring(1));
        setHashModel(model.tgWebAppData.user);
        console.log("Parsed Model:", model);
    }, []);



    const handleBuy = (market) => {
        alert(`Buying from ${market}`);
    };

    const handleSell = (market) => {
        alert(`Selling from ${market}`);
    };

    useEffect(() => {
        let intervalId;

        const fetchMarketData = async () => {
            try {
                const response = await fetch("/api/market/stats");
                if (!response.ok) {
                    throw new Error("Failed to fetch market data");
                }
                const data = await response.json();
                if (data.status === "ok") {
                    const stats = data.stats;

                    const markets = Object.entries(stats)
                        .map(([market, details]) => ({
                            name: market,
                            latest: details.latest,
                            dayHigh: details.dayHigh,
                            dayLow: details.dayLow,
                        }))
                        .filter(
                            (market) =>
                                market.latest !== undefined &&
                                market.latest !== "0" &&
                                market.name.toLowerCase().includes("rls")
                        );

                    setMarketData(markets);
                } else {
                    setError("Error fetching market stats");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
        intervalId = setInterval(fetchMarketData, 15000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
                {/* Display user data here */}
                {hashModel ? (
                    <div className="mb-6">
                        <h1 className="text-center text-2xl font-bold text-gray-800">
                            User Information
                        </h1>
                        <p className="text-center text-gray-600">
                            <strong>Name: </strong> {hashModel.first_name}
                        </p>
                        <p className="text-center text-gray-600">
                            <strong>Username: </strong> {hashModel.username}
                        </p>
                        <p className="text-center text-gray-600">
                            <strong>ID: </strong> {hashModel.id}
                        </p>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No user data available</p>
                )}

                <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">
                    Market Data
                </h1>
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">Error: {error}</p>
                ) : (
                    <div className="space-y-6">
                        {marketData.map((market) => (
                            <div
                                key={market.name}
                                className="p-4 bg-gray-100 text-center rounded-lg shadow-md border border-gray-200"
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    {market.name}
                                </h2>
                                <div className="text-sm text-gray-700 space-y-2">
                                    <p>
                                        <strong>Latest:</strong> {market.latest || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Day High:</strong> {market.dayHigh || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Day Low:</strong> {market.dayLow || "N/A"}
                                    </p>
                                </div>
                                <div className="flex justify-center gap-3 mt-6">
                                    <button
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-lg transition transform hover:scale-105"
                                        onClick={() => handleBuy(market.name)}
                                    >
                                        Buy
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-lg transition transform hover:scale-105"
                                        onClick={() => handleSell(market.name)}
                                    >
                                        Sell
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;





// import { useState, useEffect } from "react";
// import {parseHashToModel} from "./util.js";
//
// function App() {
//     const [marketData, setMarketData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     const [hashModel, setHashModel] = useState(null);
//
//     useEffect(() => {
//         const model = parseHashToModel(window.location.hash.substring(1));
//         setHashModel(model);
//         console.log("Parsed Model:", model);
//     }, []);
//     // const a = window.location.hash
//     // const b = window.Bale
//
//     const handleBuy = (market) => {
//         alert(`Buying from ${market}`);
//     };
//
//     const handleSell = (market) => {
//         alert(`Selling from ${market}`);
//     };
//
//     useEffect(() => {
//         let intervalId;
//
//         const fetchMarketData = async () => {
//             try {
//                 const response = await fetch("/api/market/stats");
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch market data");
//                 }
//                 const data = await response.json();
//                 if (data.status === "ok") {
//                     const stats = data.stats;
//
//                     const markets = Object.entries(stats)
//                         .map(([market, details]) => ({
//                             name: market,
//                             latest: details.latest,
//                             dayHigh: details.dayHigh,
//                             dayLow: details.dayLow,
//                         }))
//                         .filter(
//                             (market) =>
//                                 market.latest !== undefined &&
//                                 market.latest !== "0" &&
//                                 market.name.toLowerCase().includes("usdt")
//                         );
//
//                     setMarketData(markets);
//                 } else {
//                     setError("Error fetching market stats");
//                 }
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchMarketData();
//         intervalId = setInterval(fetchMarketData, 15000);
//
//         return () => clearInterval(intervalId);
//     }, []);
//
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
//             <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">
//                     Market Data
//                 </h1>
//                 {loading ? (
//                     <p className="text-center text-gray-600">Loading...</p>
//                 ) : error ? (
//                     <p className="text-center text-red-500">Error: {error}</p>
//                 ) : (
//                     <div className="space-y-6">
//                         {marketData.map((market) => (
//                             <div
//                                 key={market.name}
//                                 className="p-4 bg-gray-100 text-center rounded-lg shadow-md border border-gray-200"
//                             >
//                                 <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                                     {market.name}
//                                 </h2>
//                                 <div className="text-sm text-gray-700 space-y-2">
//                                     <p>
//                                         <strong>Latest:</strong> {market.latest || "N/A"}
//                                     </p>
//                                     <p>
//                                         <strong>Day High:</strong> {market.dayHigh || "N/A"}
//                                     </p>
//                                     <p>
//                                         <strong>Day Low:</strong> {market.dayLow || "N/A"}
//                                     </p>
//                                 </div>
//                                 <div className="flex justify-center gap-3 mt-6">
//                                     <button
//                                         className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-lg transition transform hover:scale-105"
//                                         onClick={() => handleBuy(market.name)}
//                                     >
//                                         Buy
//                                     </button>
//                                     <button
//                                         className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-lg transition transform hover:scale-105"
//                                         onClick={() => handleSell(market.name)}
//                                     >
//                                         Sell
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
//
// export default App;