import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { columns } from './columns';
import useGet from '@/hooks/useGet';
import { getReports } from './data';
import { FileChartColumnIcon, FileIcon, FilterIcon } from 'lucide-react';

const ReportPage = () => {
    const { data, isLoading } = useGet<getReports>('transactions');

    return (
        <div className="px-4 pt-4">
            <h1 className="text-3xl font-bold mb-4">Report</h1>
            <div className="flex flex-row gap-2 items-end mb-2">
                <div>
                    <Label htmlFor="startDatae">Start Date</Label>
                    <Input type="date" id="startDate" />
                </div>
                <div>
                    <Label htmlFor="startDatae">Start Date</Label>
                    <Input type="date" id="startDate" />
                </div>
                <Button className="flex flex-row gap-2 items-center">
                    <FilterIcon size={18} />
                    Filter
                </Button>
                <Button
                    variant="destructive"
                    className="flex flex-row gap-2 items-center ms-auto"
                >
                    <FileIcon size={18} />
                    PDF
                </Button>
                <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-500 flex flex-row items-center gap-2"
                >
                    <FileChartColumnIcon size={18} />
                    <span>Sheet file</span>
                </Button>
            </div>

            <div className="bg-white">
                {isLoading ? (
                    <div className="p-4 text-center font-medium">
                        Loading...
                    </div>
                ) : (
                    <div>
                        <DataTable
                            columns={columns}
                            data={data?.data ? data.data : []}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportPage;
