import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function CloudNotification() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            ChatSage Cloud is currently inactive. You can still use the
            self-hosted version by{" "}
            <Link
              href="https://github.com/taishikato/chatsage"
              className="font-medium underline text-yellow-700 hover:text-yellow-600"
            >
              following our installation guide
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
