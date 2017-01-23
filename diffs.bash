
# All prod apps on blazar
hshttp -a=prod:banderson GET private.hubapi.com/overwatch/v2/build/bpm | jq -r '.deployedBuilds | map(select(.environment == "prod")) | map("\(.buildInfo.packageName)@\(.buildInfo.baseVersion)") | unique | .[]' > $TMPDIR/one

# All bpm **packages** that depend on UIComponents v1: 138
hshttp -a=prod:banderson GET private.hubapi.com/overwatch/v2/search/builds/latest dependency.packageName==UIComponents packageType==bpm dependency.baseVersion==1 | jq -r '.matches | map(select(.metadata.branch == "master")) | map("\(.packageName)@\(.baseVersion)") | unique | .[]' > $TMPDIR/two

# Print prod apps with no dep on UIComponents
comm -12 $TMPDIR/one $TMPDIR/two
