import ActionBar from '@/components/ActionBar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import MembershipScreen from './partials/MembershipScreen';
import PackageScreen from './partials/PackageScreen';

const MembershipPage = () => {
    const Screens = [<MembershipScreen />, <PackageScreen />];
    const [index, setIndex] = useState<number>(0);
    return (
        <div className="bg-gray-50 h-[100vh] max-w-[800px] w-full mx-auto">
            <ActionBar backButton title="Membership detail" />
            <div className="flex justify-evenly bg-white border-b">
                <div
                    className={cn(
                        'p-2 font-bold transition-all duration-150',
                        index == 0 && 'border-b-2 border-slate-900'
                    )}
                    onClick={() => {
                        setIndex(0);
                    }}
                >
                    Membership
                </div>
                <div
                    className={cn(
                        'p-2 font-bold transition-all duration-150',
                        index == 1 && 'border-b-2 border-slate-900'
                    )}
                    onClick={() => setIndex(1)}
                >
                    Package
                </div>
            </div>
            {Screens[index]}
        </div>
    );
};

export default MembershipPage;
