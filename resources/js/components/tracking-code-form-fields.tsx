import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TrackingCodeFormFieldsProps {
    name: string;
    scriptContent: string;
    errors?: {
        name?: string;
        script_content?: string;
    };
    onNameChange: (value: string) => void;
    onScriptContentChange: (value: string) => void;
}

export function TrackingCodeFormFields({
    name,
    scriptContent,
    errors,
    onNameChange,
    onScriptContentChange,
}: TrackingCodeFormFieldsProps) {
    return (
        <div className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Enter tracking code name"
                    required
                    className="mt-1 block w-full"
                />
                <InputError
                    className="mt-2"
                    message={errors?.name}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="script_content">Script Content</Label>
                <textarea
                    id="script_content"
                    name="script_content"
                    value={scriptContent}
                    onChange={(e) => onScriptContentChange(e.target.value)}
                    placeholder="Paste your tracking script code here (without <script> tags)"
                    required
                    rows={10}
                    className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                    Enter the script content without &lt;script&gt; tags. The tags will be added automatically when the code is executed.
                </p>
                <InputError
                    className="mt-2"
                    message={errors?.script_content}
                />
            </div>
        </div>
    );
}

