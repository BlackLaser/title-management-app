import React from 'react';

const TitleList = ({ titles, onDeleteTitle, isWalletConnected }) => {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {titles.map((title) => (
              <tr key={title.uuid}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{title.title}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                <button
                  onClick={() => onDeleteTitle(title.uuid)}
                  className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                    isWalletConnected
                      ? 'text-white bg-red-500 hover:bg-red-600'
                      : 'text-gray-400 bg-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!isWalletConnected}
                >
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TitleList;
