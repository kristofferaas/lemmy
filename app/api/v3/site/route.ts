import { getSite } from "@/lib/crud/site";
// import { replaceNullWithUndefined } from "@/lib/utils/replaceNullWithUndefined";
// import type * as Lemmy from "lemmy-js-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const site = await getSite({});

    // const response = replaceNullWithUndefined(
    //   site,
    // ) satisfies Lemmy.GetSiteResponse;

    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
