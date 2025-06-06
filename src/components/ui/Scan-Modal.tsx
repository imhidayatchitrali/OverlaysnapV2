// components/QRScannerModal.tsx
import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const QRScannerModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-4">
            <button className="absolute top-4 left-4 text-2xl" onClick={onClose}>✕</button>
            <h2 className="text-xl font-semibold text-center">Join an event</h2>
            <p className="text-sm text-center mt-1 mb-6">
                Photos you take may be visible to the host and guests. You can always revisit and download them later!
            </p>
            <img src="/images/qr-mock.png" alt="QR Code" className="w-64 h-64 rounded-md" />
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-full">Go to Event</button>

            <div className="w-full mt-8">
                <p className="text-center text-sm mb-2">Or Join Using Event Code</p>
                <div className="flex justify-center items-center gap-2">
                    <input
                        placeholder="E.G, YMJFKKLDS8801"
                        className="border px-4 py-2 rounded w-64"
                    />
                    <button className="bg-black text-white px-4 py-2 rounded">Join Event</button>
                </div>
            </div>
        </div>
    );
};

export default QRScannerModal;
